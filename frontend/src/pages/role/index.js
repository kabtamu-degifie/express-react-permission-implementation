import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Skeleton,
  Typography,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { hasPermission } from "../../libs/local-storage";
import { fetch as fetchPermissions } from "../../services/permission/slice";
import {
  fetch as fetchRoles,
  update as updateRole,
} from "../../services/role/slice";
import { Add, PublishedWithChanges } from "@mui/icons-material";

function Role() {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch = useDispatch();

  const { permissions, isLoading: permissionLoading } = useSelector(
    (state) => state.permissions
  );

  const {
    roles,
    isSuccess: roleSuccess,
    isLoading: roleLoading,
  } = useSelector((state) => state.roles);

  // did mount effect
  useEffect(() => {
    dispatch(fetchPermissions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // dispatch + did mount effect
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // state + did mount effect
  useEffect(() => {
    if (roleSuccess || roles) {
      if (selectedRoleId) {
        const role = roles.find((role) => role._id === selectedRoleId);
        setSelectedRole(role);
      } else {
        setSelectedRoleId(roles[0]._id);
      }
    }
  }, [roles, roleSuccess, selectedRoleId]);

  // Set selected role id
  const selectRoleIdHandler = (e) => {
    setSelectedRoleId(e.target.value);
    dispatch(fetchRoles());
  };

  // Group: permissions
  const groupPermissions = () => {
    // extract permission name => split name by _ => add to Set => back to Array => return {name, permission}
    return Array.from(
      new Set(permissions.map((perm) => perm.name.split("_")[1]))
    ).map((name) => ({
      name,
      permissions: permissions.filter((perm) => perm.name.includes(name)),
    }));
  };

  // Select all: for selected type of permission
  const checkAllHandler = (event, cell) => {
    // cell: view, create, update, remove
    const permPerType = permissions.filter((p) => p.name.includes(cell));
    const selectedRolePerms = [...selectedRole.permissions];
    if (event.target.checked) {
      for (let p of permPerType) {
        const index = selectedRolePerms.findIndex((srp) => srp._id === p._id);
        if (index === -1) {
          selectedRolePerms.push(p);
          // check view to include
          if (cell !== "view") {
            permissions.forEach((p) => {
              if (p.name.includes("view")) {
                const pIndex = selectedRolePerms.findIndex(
                  (sp) => sp._id === p._id
                );
                if (pIndex === -1) {
                  selectedRolePerms.push(p);
                }
              }
            });
          }
        }
      }
    } else {
      for (let p of permPerType) {
        const index = selectedRolePerms.findIndex((srp) => srp._id === p._id);
        if (index !== -1) {
          if (cell === "view") {
            permissions.forEach((p) => {
              const pIndex = selectedRolePerms.findIndex(
                (sp) => sp._id === p._id
              );
              if (pIndex !== -1) {
                selectedRolePerms.splice(pIndex, 1);
              }
            });
          } else {
            selectedRolePerms.splice(index, 1);
          }
        }
      }
    }
    setSelectedRole((prev) => ({ ...prev, permissions: selectedRolePerms }));
  };

  // Select one: for single permission
  const checkIndividual = (event, permission, group) => {
    const selectedRolePerms = [...selectedRole.permissions];

    const index = selectedRolePerms.findIndex((p) => p._id === permission._id);
    const viewName = `view_${group.name}`;

    if (index === -1 && event.target.checked) {
      selectedRolePerms.push(permission);
      if (permission.name !== viewName) {
        // check if permission is included in role permissions
        const vIndex = selectedRolePerms.findIndex((p) => p.name === viewName);

        if (vIndex === -1) {
          // check in all permissions from db
          const pIndex = group.permissions.findIndex(
            (p) => p.name === viewName
          );
          if (pIndex !== 1) {
            selectedRolePerms.push(group.permissions[pIndex]);
          }
        }
      }
    } else {
      if (permission.name === viewName) {
        group.permissions.forEach((p) => {
          const icp = selectedRolePerms.findIndex((cp) => cp._id === p._id);
          if (icp !== -1) {
            selectedRolePerms.splice(icp, 1);
          }
        });
      } else {
        selectedRolePerms.splice(index, 1);
      }
    }
    setSelectedRole((prv) => ({ ...prv, permissions: selectedRolePerms }));
  };

  const getRolePermissionsLength = (type) => {
    return selectedRole.permissions.filter((sp) => sp.name.includes(type))
      .length;
  };

  const getPermissionsLengthUnderType = (type) => {
    return permissions.filter((p) => p.name.includes(type)).length;
  };

  const checkForAllChecked = (type) => {
    return (
      getRolePermissionsLength(type) === getPermissionsLengthUnderType(type)
    );
  };

  const checkForIndeterminate = (type) => {
    return (
      getRolePermissionsLength(type) > 0 &&
      getRolePermissionsLength(type) !== getPermissionsLengthUnderType(type)
    );
  };

  const handleRolePermissionUpdate = () => {
    dispatch(
      updateRole({
        id: selectedRoleId,
        role: {
          ...selectedRole,
        },
      })
    );
  };

  // Check that the permission is included in selected role
  const roleHasPermission = (permissionId) => {
    return (
      selectedRole.permissions.findIndex((p) => p._id === permissionId) !== -1
    );
  };

  const headerCells = ["view", "create", "update", "remove"];

  return (
    <Box
      component="main"
      sx={{
        border: "1px dashed grey",
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        borderRadius: 1,
      }}
    >
      <Stack direction="column" spacing={2} p={2}>
        <Box sx={{ borderBottom: 1, p: 2, borderColor: "grey.200" }}>
          {roleLoading || !roles ? (
            <Skeleton height={80} />
          ) : (
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              spacing={2}
            >
              <Stack spacing={2} alignItems="center" direction="row">
                <FormControl fullWidth>
                  <InputLabel id="role">Role</InputLabel>
                  <Select
                    sx={{ textTransform: "capitalize" }}
                    labelId="role-label"
                    id="role"
                    value={selectedRoleId}
                    label="Role"
                    onChange={selectRoleIdHandler}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role._id} value={role._id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                  {selectedRole.name}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  fullWidth
                  onClick={handleRolePermissionUpdate}
                  size="medium"
                  variant="outlined"
                  sx={{ minWidth: 200 }}
                  startIcon={<PublishedWithChanges />}
                >
                  Save Changes
                </Button>

                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>
        <Box>
          {permissionLoading || roleLoading || !permissions || !selectedRole ? (
            <Skeleton height={200} />
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Activity</TableCell>
                      {headerCells.map((cell) => (
                        <TableCell key={cell}>
                          <FormControlLabel
                            disabled={
                              roleLoading ||
                              permissionLoading ||
                              !hasPermission("update_role")
                            }
                            onChange={(e) => checkAllHandler(e, cell)}
                            id={cell}
                            label={cell}
                            control={
                              <Checkbox
                                indeterminate={checkForIndeterminate(cell)}
                                checked={checkForAllChecked(cell)}
                              />
                            }
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupPermissions().map((group) => (
                      <TableRow key={group.name} hover role="checkbox">
                        <TableCell>{group.name}</TableCell>
                        {group.permissions.map((permission) => (
                          <TableCell key={permission._id}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  id={permission._id}
                                  name={permission._id}
                                  disabled={
                                    roleLoading || !hasPermission("update_role")
                                  }
                                  checked={roleHasPermission(permission._id)}
                                  onChange={(e) =>
                                    checkIndividual(e, permission, group)
                                  }
                                />
                              }
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default Role;
