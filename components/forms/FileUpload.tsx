"use client"
import {  useToast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
const authenticator = async()=>{
    try {
        const response = await fetch(
          `${config.env.apiEndpoint}/api/auth/imagekit`
        );
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`)
        }
        const data = await response.json();
        const {signature,expire,token} = data;
        return {
          token,
          expire,
          signature,
        };
    } catch (error) {
        throw new Error(`Authentication failed: ${error}`);
    }
}
interface Props {
  type: 'image'|'video';
  accept: string;
  placeholder:string;
  folder:string;
  variant: 'dark'|'light'
  onFileChange: (filePath:string)=>void;
}
const {env:{imagekit:{publicKey,privateKey,urlEndpoint}}}=config;
const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };
  const { toast } = useToast();
  const onError = (error: any) => {
    console.log(error);
    toast({
      title: error,
      description: `${type} could not be uploaded`,
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "File Uploaded Successfully",
      description: `${res.filePath} Uploaded Successfully!`,
    });
  };
  const onValidate = (file:File)=>{
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload only files under 20MB",
          variant: "destructive",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload only files under 50MB",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  }
  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />
      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>
      {progress > 0 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {file && type === "image" ? (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      ) : type === "video" ? (
        <IKVideo
          path={file?.filePath}
          controls={true}
          className="h-96 w-full rounded-xl"
        />
      ) : null}
    </ImageKitProvider>
  );
};
export default FileUpload