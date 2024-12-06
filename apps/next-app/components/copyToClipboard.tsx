"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { CreateApiKey } from "lib/actions/user.actions";

import { Check, Copy } from "lucide-react";
import { useState, useCallback } from "react";

export const CopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const { mutate, data, isError, isPending } = useMutation({
    mutationFn: async () => await CreateApiKey(),
  });

  const handleGenerateApi = () => {
    mutate();
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(data?.apiKey).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [data]);

  if (isError) {
    return <div>Error generating API key</div>;
  }

  return (
    <div className="flex w-full  items-center space-x-2 py-4 border border-gray-200 rounded-lg px-10">
      <div className="flex flex-col gap-4 w-96">
        <div className="flex gap-2">
          <Input
            type="password"
            value={data?.apiKey}
            readOnly
            className="flex-grow bg-gray-100 h-10 w-40"
            defaultValue={""}
          />

          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className={`w-10 h-10 ${isCopied ? "bg-green-100" : ""}`}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Button onClick={handleGenerateApi} variant={"outline"} className="">
          {isPending ? "Generating API key..." : "Generate API key"}
        </Button>
      </div>
    </div>
  );
};
