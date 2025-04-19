"use client";

import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logOutAction } from "@/actions/users";

function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    
    const {errorMessage} = await logOutAction();

    if (!errorMessage) {
      toast.success("Logged out", {
        description: "You have been successfully logged out",
      });
      router.push("/");
    } else {
      toast.error("Error", {
        description: errorMessage,
      });
    }
    setLoading(false);
  };
  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="outline"
      className="w-24"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogoutButton;
