import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAvatar, getProfile, updateProfile } from "@/api/profile.service";
import { AvatarList, IProfile } from "@/types";

const formSchema = z.object({
  name: z.string().min(3),
  avatar: z.string().uuid({
    message: "Please select avatar",
  }),
});

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{
    name: string;
    image: string;
    email: string;
    created_at: string;
  }>({
    name: "",
    image: "",
    email: "",
    created_at: "",
  });
  const [avatarList, setAvatarLst] = useState<AvatarList[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      avatar: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const avatar = await getAvatar();
      if (avatar.status) {
        setAvatarLst(avatar.data);
      }

      const response = await getProfile();
      if (response.status) {
        const data: IProfile = response.data;
        setProfile({
          name: data.name,
          image:
            data.avatar.image.base_url +
            data.avatar.image.root +
            data.avatar.image.folder +
            data.avatar.image.name,
          email: data.email,
          created_at: new Date(data.created_at).toDateString(),
        });
        form.reset({
          name: data.name,
          avatar: data.avatar.id,
        }); // Pre populate the form with map data
      }
    };
    fetchProfile();
  }, []);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await updateProfile(data);
    if (result.status) {
      navigate("/");
    }
  }

  return (
    <div className="flex h-full justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Edit Profile</h1>
        <div className="mb-4 flex items-center justify-between bg-gray-100 rounded-md p-2">
          <img src={profile.image} className="w-16 h-16 my-1"></img>
          <div className="text-sm mr-2 text-right font-bold text-gray-500">
            <p>{profile.email}</p>
            <p>Registered On {profile.created_at}</p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Avatar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {avatarList.map((item) => {
                        return (
                          <SelectItem value={item.id} key={item.id}>
                            <div className="flex gap-4 items-center">
                              <img src={item.image} className="w-6 h-6"></img>
                              <p>{item.tile_size} px</p>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
              <Button type="submit" className="w-full md:w-auto px-8">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
