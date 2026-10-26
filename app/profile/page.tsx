"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  CheckmarkCircle02Icon,
  ArrowLeft01Icon,
  Shield01Icon,
  GraduationScrollIcon,
} from "@hugeicons/core-free-icons";

// =========================================================================
// ROLE CONFIGURATION: Change to "user" or "admin" to test different roles
// =========================================================================
const role: "user" | "admin" = "user";

// =========================================================================
// HARD-CODED MOCK DATA
// =========================================================================

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  rollNumber?: string;
  department?: string;
  adminId?: string;
  designation?: string;
  avatarUrl: string;
  initials: string;
}

const MOCK_USER_DATA: ProfileData = {
  name: "Aarav Sharma",
  email: "aarav.sharma@campus.edu",
  phone: "9876543210",
  rollNumber: "STU-2024-8841",
  department: "Computer Science & Engineering",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  initials: "AS",
};

const MOCK_ADMIN_DATA: ProfileData = {
  name: "Dr. Rajesh Verma",
  email: "rajesh.verma@campus.edu",
  phone: "9123456780",
  adminId: "ADM-2024-0012",
  designation: "Dean of Academic Affairs & Chief Proctor",
  avatarUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  initials: "RV",
};

export default function ProfilePage() {
  const currentRoleDefault = role === "admin" ? MOCK_ADMIN_DATA : MOCK_USER_DATA;

  // Saved state holds the currently confirmed profile data
  const [savedData, setSavedData] = React.useState<ProfileData>(currentRoleDefault);

  // Form state holds the editable inputs
  const [formData, setFormData] = React.useState<ProfileData>(currentRoleDefault);

  // Validation errors
  const [errors, setErrors] = React.useState<{
    name?: string;
    phone?: string;
  }>({});

  // Success message after save
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // Sync if role variable changes during testing/hot reloading
  React.useEffect(() => {
    const updatedRoleDefault = role === "admin" ? MOCK_ADMIN_DATA : MOCK_USER_DATA;
    setSavedData(updatedRoleDefault);
    setFormData(updatedRoleDefault);
    setErrors({});
    setSuccessMessage(null);
  }, [role]);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};

    // Validate Full Name: required, min 3 characters
    const trimmedName = (formData.name || "").trim();
    if (!trimmedName) {
      newErrors.name = "Full name is required";
    } else if (trimmedName.length < 3) {
      newErrors.name = "Full name must be at least 3 characters";
    }

    // Validate Phone Number: must be exactly 10 digits
    const trimmedPhone = (formData.phone || "").trim();
    if (!trimmedPhone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(trimmedPhone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage(null);
      return;
    }

    // Save changes to displayed data state
    setSavedData(formData);
    setErrors({});
    setSuccessMessage("Profile updated successfully!");
  };

  const handleCancel = () => {
    // Reset form to last saved values
    setFormData(savedData);
    setErrors({});
    setSuccessMessage(null);
  };

  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Navigation back to Dashboard */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Role badge indicator */}
          <Badge
            variant="outline"
            className={
              isAdmin
                ? "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-400 font-medium"
                : "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium"
            }
          >
            <HugeiconsIcon
              icon={isAdmin ? Shield01Icon : GraduationScrollIcon}
              className="mr-1.5 size-3.5"
            />
            Mode: {isAdmin ? "Admin View" : "Student View"} (role = "{role}")
          </Badge>
        </div>

        {/* Profile Card */}
        <Card className="border border-border/80 shadow-xs">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              Edit Profile
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {isAdmin
                ? "Manage administrative credentials and contact information."
                : "Manage your student identity and contact information."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Header Identity Display (Avatar + Displayed Name & Role) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-border/60 bg-muted/30 p-4">
              <Avatar className="size-16 ring-2 ring-primary/20 shrink-0">
                <AvatarImage src={savedData.avatarUrl} alt={savedData.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-base">
                  {savedData.initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground truncate">
                    {savedData.name}
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    {isAdmin ? "Administrator" : "Student"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {isAdmin ? savedData.designation : savedData.department}
                </p>
                <p className="text-xs text-muted-foreground/80 mt-0.5 font-mono">
                  {isAdmin ? savedData.adminId : savedData.rollNumber} • {savedData.email}
                </p>
              </div>
            </div>

            {/* Success notification banner */}
            {successMessage && (
              <div
                role="status"
                className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300"
              >
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4 shrink-0" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {/* Edit Form */}
            <form id="profile-form" onSubmit={handleSave} className="space-y-4">
              {/* Common Field: Full Name (editable) */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs font-medium text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Common Field: Email (read-only) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email">Email Address</Label>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Read-only
                  </span>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  readOnly
                  disabled
                  className="bg-muted/50 text-muted-foreground cursor-not-allowed select-none"
                />
              </div>

              {/* Common Field: Phone Number (editable) */}
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-xs font-medium text-destructive">{errors.phone}</p>
                )}
                <p className="text-[11px] text-muted-foreground">
                  Must be exactly 10 digits without country code.
                </p>
              </div>

              <Separator className="my-4" />

              {/* Role-Specific Fields */}
              {isAdmin ? (
                <>
                  {/* Admin Field: Admin ID (read-only) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="adminId">Admin ID</Label>
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Read-only
                      </span>
                    </div>
                    <Input
                      id="adminId"
                      type="text"
                      value={formData.adminId || ""}
                      readOnly
                      disabled
                      className="bg-muted/50 text-muted-foreground cursor-not-allowed select-none font-mono"
                    />
                  </div>

                  {/* Admin Field: Designation (editable) */}
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      type="text"
                      value={formData.designation || ""}
                      onChange={(e) => handleChange("designation", e.target.value)}
                      placeholder="e.g. Dean of Academic Affairs"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* User Field: Roll Number (read-only) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Read-only
                      </span>
                    </div>
                    <Input
                      id="rollNumber"
                      type="text"
                      value={formData.rollNumber || ""}
                      readOnly
                      disabled
                      className="bg-muted/50 text-muted-foreground cursor-not-allowed select-none font-mono"
                    />
                  </div>

                  {/* User Field: Department (editable) */}
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      type="text"
                      value={formData.department || ""}
                      onChange={(e) => handleChange("department", e.target.value)}
                      placeholder="e.g. Computer Science & Engineering"
                    />
                  </div>
                </>
              )}
            </form>
          </CardContent>

          <CardFooter className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-border/60 bg-muted/10 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="profile-form"
              className="w-full sm:w-auto"
            >
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
