import Layout from "@/layout";
import { Outlet } from "react-router";

const PublicRoutesWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PublicRoutesWrapper;
