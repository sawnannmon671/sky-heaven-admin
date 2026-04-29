"use client";

import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Stack, Group, Divider, Text, Anchor } from "@mantine/core";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";

export function AuthForm() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 1 ? "Password is required" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      form.setErrors({ email: "Invalid credentials" });
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
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
          <Button type="submit" fullWidth mt="sm" color="#014F86">
            Sign in
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
        Google Login
      </Button>

      <Text c="dimmed" size="sm" ta="center" mt="md">
        Don&apos;t have an account?{" "}
        <Anchor component={Link} href="/register" size="sm" fw={500} c="#014F86">
          Register
        </Anchor>
      </Text>
    </>
  );
}