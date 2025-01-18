import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Download, Check, X } from "lucide-react";

interface UploadScheduleProps {
  onClose?: () => void;
}

const UploadSchedule: React.FC<UploadScheduleProps> = ({
  onClose = () => {},
}) => {
  const [extractedText, setExtractedText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        // Simulated OCR result
        setExtractedText(
          "Math 101: Mon, Wed, Fri 9:00 AM - 10:30 AM\nPhysics 202: Tue, Thu 11:00 AM - 12:30 PM",
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadICS = () => {
    // Simple ICS file generation
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Math 101
DTSTART:20240101T090000
DTEND:20240101T103000
RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schedule.ics";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Upload Schedule</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-4">
        {!imagePreview ? (
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="schedule-upload"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="schedule-upload"
              className="cursor-pointer space-y-2 block"
            >
              <Upload className="h-8 w-8 mx-auto text-gray-400" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop your schedule image
              </p>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <img
              src={imagePreview}
              alt="Uploaded schedule"
              className="max-h-64 mx-auto rounded-lg"
            />
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm text-green-600">
                Successfully processed
              </span>
            </div>
          </div>
        )}

        {extractedText && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Extracted Schedule</h3>
            <Textarea
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              className="min-h-[150px]"
              placeholder="Edit the extracted schedule here..."
            />
            <Button
              onClick={downloadICS}
              className="w-full sm:w-auto"
              variant="default"
            >
              <Download className="h-4 w-4 mr-2" />
              Download ICS File
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UploadSchedule;
