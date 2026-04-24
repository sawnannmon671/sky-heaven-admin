import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Box, Paper, Title, Text } from "@mantine/core";
import { AuthForm } from "@/components/auth/auth-form";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fa",
      }}
    >
      <Paper p={40} radius="md" style={{ width: 400, background: "white" }}>
        <Title ta="center" mb="lg" c="#014F86">
          Sky Haven CMS
        </Title>
        <Text ta="center" c="dimmed" size="sm" mb={30}>
          Condo Management System
        </Text>
        <AuthForm />
      </Paper>
    </Box>
  );
}
