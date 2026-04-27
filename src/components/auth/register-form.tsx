"use client";

import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Stack, Divider, Text, Anchor } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export function RegisterForm() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 6 ? "Password must include at least 6 characters" : null),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    // Implement your register logic here.
    // For now, we will just simulate a registration and redirect to login
    console.log("Registering with:", values);
    router.push("/login");
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Your name"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            {...form.getInputProps("confirmPassword")}
          />
          <Button type="submit" fullWidth mt="sm" color="#014F86">
            Register
          </Button>
        </Stack>
      </form>

      <Divider label="Or continue with" labelPosition="center" my="lg" />

      <Button
        variant="default"
        fullWidth
        leftSection={<IconBrandGoogle size={18} />}
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        mb="md"
      >
        Google Register
      </Button>

      <Text c="dimmed" size="sm" ta="center" mt="md">
        Already have an account?{" "}
        <Anchor component={Link} href="/login" size="sm" fw={500} c="#014F86">
          Sign in
        </Anchor>
      </Text>
    </>
  );
}