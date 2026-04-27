import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Box, Paper, Title, Text, Center, Image } from "@mantine/core";
import { RegisterForm } from "@/components/auth/register-form";

export default async function RegisterPage() {
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
        background: "#f0f4f9",
      }}
    >
      <Paper p={40} radius={16} shadow="sm" style={{ width: 450, background: "white" }}>
        <Center mb="md">
          <Image src="/sh.png" alt="Sky Haven Logo" h={60} w="auto" fit="contain" />
        </Center>
        <Title ta="center" mb="lg" c="#014F86">
          Register
        </Title>
        <Text ta="center" c="dimmed" size="sm" mb={30}>
          Create a new account
        </Text>
        <RegisterForm />
      </Paper>
    </Box>
  );
}