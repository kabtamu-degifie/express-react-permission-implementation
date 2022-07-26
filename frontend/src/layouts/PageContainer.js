import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Role from "../pages/role";
import NavBar from "./NavBar";

function PageContainer() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Routes>
          <Route
            path="role"
            element={
              <ProtectedRoute>
                <Role />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default PageContainer;
