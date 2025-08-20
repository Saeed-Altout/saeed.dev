import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/stores/auth";
import { Loader2, Check, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUploadProfilePictureMutation } from "@/hooks/auth";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export type UploadImageReturn = {
  file: File | null;
  url: string | null;
  isLoading: boolean;
};

interface UploadImageProps {
  onChange?: (params: UploadImageReturn) => void;
}

export function UploadImage({ onChange }: UploadImageProps) {
  const { control, setValue } = useFormContext();
  const prevUrl = useAuthStore.getState().profile_picture;
  const profilePictureRef = useRef<HTMLInputElement>(null);

  const [url, setUrl] = useState<string | null>(prevUrl || null);

  const { mutate: uploadProfilePicture, isPending: isUploading } =
    useUploadProfilePictureMutation();

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      if (onChange) {
        onChange({ file: selectedFile, url: null, isLoading: true });
      }
      uploadProfilePicture(
        { file: selectedFile },
        {
          onSuccess: (data) => {
            setUrl(data.data.url);
            setValue("profile_picture", data.data.url, {
              shouldValidate: true,
            });
            if (onChange) {
              onChange({
                file: selectedFile,
                url: data.data.url,
                isLoading: false,
              });
            }
          },
          onError: () => {
            setUrl(null);
            setValue("profile_picture", null, { shouldValidate: true });
            if (onChange) {
              onChange({
                file: selectedFile,
                url: null,
                isLoading: false,
              });
            }
          },
        }
      );
    } else {
      setUrl(null);
      setValue("profile_picture", null, { shouldValidate: true });
      if (onChange) {
        onChange({ file: null, url: null, isLoading: false });
      }
    }
  };

  const hasUploaded = !!url;

  return (
    <FormField
      control={control}
      name="profile_picture"
      render={() => (
        <FormItem>
          <FormLabel
            className="h-20 border border-dashed hover:border-solid transition-all rounded-md flex items-center justify-center cursor-pointer"
            htmlFor="profile-picture-upload"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="ml-2">Uploading...</span>
              </>
            ) : hasUploaded ? (
              <>
                <Check className="w-4 h-4" />
                <span className="mr-2">Uploaded</span>
              </>
            ) : (
              <>
                <ImagePlus className="w-4 h-4" />
                <span className="mr-2">Upload Profile Picture</span>
              </>
            )}
          </FormLabel>
          <FormControl>
            <Input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              ref={profilePictureRef}
              className="hidden"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
