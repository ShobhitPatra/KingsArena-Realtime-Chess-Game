import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserStore } from "@repo/store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "required field" }),
    email: z.string().email({ message: "enter a valid email" }),
    password: z.string().min(6, { message: "password too short" }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });
export const Signup = () => {
  const { setUser, user } = useUserStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (
        !values.email ||
        !values.name ||
        !values.password ||
        !values.confirmPassword
      )
        return;
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      });
      if (!response.ok) {
        throw new Error(`Http error! Status :${response.status}`);
      }
      const data = await response.json();
      const user = {
        id: data.user.id,
        name: data.user.name,
        token: data.token,
        isGuest: false,
      };
      setUser(user);
      const notify = () => toast.success("Registered successfully");
      notify();
    } catch (error) {
      console.error("error sending data to /signup", error);
      const notify = () =>
        toast.error("Registration failed", {
          autoClose: 1500,
        });
      notify();
    }
  }
  return (
    <div className="bg-gray-300 h-screen flex items-center justify-center flex-wrap">
      <div className=" md:p-4 p-2 text-5xl font-extrabold  text-gray-700 text-center space-y-1">
        <h1>Play Chess</h1>
        <h1>Online</h1>
        <h1 className="text-2xl">on</h1>
        <h1>KingsArena </h1>
      </div>
      {/* form  */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-green-500/80 space-y-6 rounded-md p-2 w-64"
        >
          <FormLabel className="text-3xl text-gray-800 font-extrabold flex justify-center">
            <h1>REGISTER</h1>
          </FormLabel>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold px-2">
                  email
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-gray-800 font-medium"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold px-2">
                  name
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-gray-800 font-medium"
                    placeholder="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold px-2">
                  password
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-gray-800 font-medium"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold px-2">
                  confirm password
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-gray-800 font-medium"
                    placeholder="confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-green-900 font-semibold w-full hover:bg-green-900/80"
          >
            Submit
          </Button>
          <a href="/signin" className="text-center">
            {" "}
            <h4 className="pb-2 text-shadow-gray-900 hover:text-blue-700  hover:underline ">
              Already have an account ?{" "}
            </h4>
          </a>
        </form>
      </Form>
      <ToastContainer />
    </div>
  );
};
