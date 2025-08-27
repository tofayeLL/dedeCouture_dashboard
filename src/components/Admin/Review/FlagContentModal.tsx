"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface FlagContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (reason: string, reasonLabel: string, comments: string) => void;
}

// Define the reason options with both value and label
const REASON_OPTIONS = [
  { value: "inappropriate", label: "Inappropriate Content" },
  { value: "harassment", label: "Harassment or threats" },
  { value: "spam", label: "Spam or self-promotion" },
  { value: "off-topic", label: "Off-topic or irrelevant content" },
  { value: "other", label: "Other (Please specify)" },
];

export function FlagContentModal({
  open,
  onOpenChange,
  onSubmit,
}: FlagContentModalProps) {
  const [selectedReason, setSelectedReason] = useState("inappropriate");
  const [comments, setComments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Find the full label for the selected reason
  const selectedOption = REASON_OPTIONS.find(option => option.value === selectedReason);
  const reasonLabel = selectedOption ? selectedOption.label : selectedReason;
  
  // Log the values inside an object
  const flagData = {
    reasonValue: selectedReason,
    reasonLabel: reasonLabel,
    comments: comments
  };
  
  console.log("Flag Data:", flagData);
  
  // Call the onSubmit callback with both value and label
  if (onSubmit) {
    onSubmit(selectedReason, reasonLabel, comments);
  }
  
  // Reset form and close modal
  setSelectedReason("inappropriate");
  setComments("");
  onOpenChange(false);
};

  const handleClose = () => {
    // Reset form when closing
    setSelectedReason("inappropriate");
    setComments("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="lg:max-w-xl mx-auto px-6 py-8">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="lg:text-3xl font-semibold">
            Flag Content
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={handleClose}
          >
            <X className="h-4 w-4 " />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-medium text-foreground">
                Reason for flagging content:
              </Label>
              <RadioGroup
                value={selectedReason}
                onValueChange={setSelectedReason}
                required
              >
                {REASON_OPTIONS.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="text-lg font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="comments"
                className="text-lg font-medium text-foreground"
              >
                Additional Comments (Optional)
              </Label>
              <Textarea
                id="comments"
                placeholder="Type your comments here..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#FE0659] hover:bg-[#FE0659] text-white text-lg px-6"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}