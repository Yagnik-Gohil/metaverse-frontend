import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "@/api/auth.service";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const response = await verifyOtp({
      email: email,
      otp: Number(values.otp),
      device_id: "92ee6562-0150-4f15-81f5-69c79ad3ebd1",
    });

    console.log(response);

    if (response.status) {
      const data = response.data;
      localStorage.setItem("token", data.jwt);
      navigate("/");
    }
  }

  const handleResendOtp = async () => {
    const response = await resendOtp({
      email: email,
    });
    if (response.status) {
      form.reset();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900">
          Email verification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Verify
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-zinc-500">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                className="w-full font-medium text-zinc-600 hover:text-zinc-500"
                onClick={handleResendOtp}
              >
                Resend OTP to {email}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
