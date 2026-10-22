"use client";

import * as React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  Calendar03Icon,
  Task01Icon,
  UserIcon,
  FingerprintScanIcon,
  Location01Icon,
  Notification01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  GraduationScrollIcon,
  Search01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";

// ==========================================
// HARD-CODED MOCK DATA (Top of the file)
// ==========================================

const CURRENT_USER = {
  name: "Aarav Sharma",
  studentId: "STU-2024-8841",
  email: "aarav.sharma@campus.edu",
  department: "Computer Science & Engineering",
  semester: "6th Semester (B.Tech)",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  initials: "AS",
};

const NAV_ITEMS = [
  {
    title: "Dashboard",
    icon: DashboardSquare01Icon,
    href: "#",
    isActive: true,
  },
  {
    title: "Attendance",
    icon: Calendar03Icon,
    href: "#",
    isActive: false,
  },
  {
    title: "Exams",
    icon: Task01Icon,
    href: "#",
    isActive: false,
  },
  {
    title: "Profile",
    icon: UserIcon,
    href: "#",
    isActive: false,
  },
];

const SUMMARY_METRICS = [
  {
    id: "attendance-percent",
    title: "Overall Attendance %",
    value: "88.5%",
    subtitle: "Minimum required threshold: 75.0%",
    statusBadge: "Above Target (+13.5%)",
    icon: Calendar03Icon,
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    progressPercent: 88.5,
  },
  {
    id: "classes-attended",
    title: "Classes Attended",
    value: "142 / 160",
    subtitle: "18 absences (12 excused/medical)",
    statusBadge: "88.8% Rate",
    icon: CheckmarkCircle02Icon,
    badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    progressPercent: 88.8,
  },
  {
    id: "upcoming-exams",
    title: "Upcoming Exams",
    value: "3 Scheduled",
    subtitle: "Next: Distributed Systems (Nov 3)",
    statusBadge: "Hall A-3 • Proctored",
    icon: Task01Icon,
    badgeColor: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    progressPercent: 60,
  },
  {
    id: "notifications",
    title: "Notifications",
    value: "4 Unread",
    subtitle: "2 biometric & exam guidelines",
    statusBadge: "Action Required",
    icon: Notification01Icon,
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    progressPercent: 40,
  },
];

type AttendanceRecord = {
  id: string;
  date: string;
  time: string;
  subject: string;
  courseCode: string;
  room: string;
  status: "Present" | "Absent";
  verifiedBy: "Biometric" | "Location" | "Unverified";
  verificationDetail: string;
};

const RECENT_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "att-101",
    date: "Oct 22, 2026",
    time: "09:00 AM - 10:30 AM",
    subject: "Distributed Systems & Cloud Computing",
    courseCode: "CS-401",
    room: "Lecture Hall B4",
    status: "Present",
    verifiedBy: "Biometric",
    verificationDetail: "Face ID + Liveness Check",
  },
  {
    id: "att-102",
    date: "Oct 22, 2026",
    time: "11:15 AM - 12:45 PM",
    subject: "Cryptography & Network Security",
    courseCode: "CS-403",
    room: "Academic Block 2, Rm 204",
    status: "Present",
    verifiedBy: "Location",
    verificationDetail: "Campus Geofence (Radius: 25m)",
  },
  {
    id: "att-103",
    date: "Oct 21, 2026",
    time: "02:00 PM - 03:30 PM",
    subject: "Artificial Intelligence & Heuristics",
    courseCode: "CS-405",
    room: "Main Auditorium A1",
    status: "Absent",
    verifiedBy: "Unverified",
    verificationDetail: "No verification logged",
  },
  {
    id: "att-104",
    date: "Oct 21, 2026",
    time: "10:00 AM - 01:00 PM",
    subject: "Database Systems & Internals Lab",
    courseCode: "CS-402L",
    room: "Systems Lab 3",
    status: "Present",
    verifiedBy: "Biometric",
    verificationDetail: "Fingerprint Scanner (Terminal 02)",
  },
  {
    id: "att-105",
    date: "Oct 20, 2026",
    time: "03:30 PM - 05:00 PM",
    subject: "Software Engineering & Agile Architectures",
    courseCode: "CS-406",
    room: "Seminar Room 102",
    status: "Present",
    verifiedBy: "Location",
    verificationDetail: "Campus Geofence (Room 102 Beacon)",
  },
  {
    id: "att-106",
    date: "Oct 19, 2026",
    time: "09:00 AM - 10:30 AM",
    subject: "Distributed Systems & Cloud Computing",
    courseCode: "CS-401",
    room: "Lecture Hall B4",
    status: "Present",
    verifiedBy: "Biometric",
    verificationDetail: "Face ID Verification",
  },
  {
    id: "att-107",
    date: "Oct 18, 2026",
    time: "11:15 AM - 12:45 PM",
    subject: "Advanced Operating Systems",
    courseCode: "CS-408",
    room: "Computing Hub 1",
    status: "Absent",
    verifiedBy: "Unverified",
    verificationDetail: "Medical Exemption Pending",
  },
];

// ==========================================
// DASHBOARD COMPONENT
// ==========================================

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"All" | "Present" | "Absent">("All");

  const filteredAttendance = React.useMemo(() => {
    return RECENT_ATTENDANCE.filter((item) => {
      const matchesSearch =
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.verificationDetail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ? true : item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-muted/20">
        {/* Left Sidebar */}
        <Sidebar className="border-r border-border/60 bg-sidebar">
          {/* Sidebar Header: App Name */}
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <HugeiconsIcon icon={GraduationScrollIcon} className="size-5" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate font-heading text-base font-bold tracking-tight text-sidebar-foreground">
                  Smart Campus
                </span>
                <span className="truncate text-xs font-medium text-muted-foreground">
                  Attendance & Proctoring
                </span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarSeparator className="mx-2" />

          {/* Sidebar Navigation */}
          <SidebarContent className="px-2 py-3">
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent className="mt-1 space-y-1">
                <SidebarMenu>
                  {NAV_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={<a href={item.href} />}
                        isActive={item.isActive}
                        className={
                          item.isActive
                            ? "bg-primary text-primary-foreground font-medium shadow-xs hover:bg-primary/90 hover:text-primary-foreground"
                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }
                      >
                        <HugeiconsIcon icon={item.icon} className="size-4 shrink-0" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* System Status info box */}
            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-foreground">
                  Campus Geofence: Active
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Biometric checkpoints and indoor beacons synchronized.
              </p>
            </div>
          </SidebarContent>

          {/* Sidebar Footer: User Details */}
          <SidebarFooter className="border-t border-border/60 p-3">
            <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-sidebar-accent transition-colors">
              <Avatar className="size-9 ring-1 ring-border">
                <AvatarImage src={CURRENT_USER.avatarUrl} alt={CURRENT_USER.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                  {CURRENT_USER.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="truncate text-xs font-semibold text-sidebar-foreground">
                  {CURRENT_USER.name}
                </span>
                <span className="truncate text-[11px] text-muted-foreground">
                  {CURRENT_USER.studentId}
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="flex flex-1 flex-col bg-background">
          {/* Top Header */}
          <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-border/60 bg-background/90 px-4 md:px-8 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-1 h-4" />
              <div>
                <h1 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                  Student Dashboard
                </h1>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Smart Campus Attendance & Proctoring Portal
                </p>
              </div>
            </div>

            {/* Top Right: User Name & Avatar */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:inline-flex items-center gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 py-1 font-medium">
                <HugeiconsIcon icon={Shield01Icon} className="size-3" />
                Verified Student
              </Badge>

              <div className="flex items-center gap-3 pl-2 border-l border-border/60">
                <div className="hidden flex-col text-right sm:flex">
                  <span className="text-sm font-semibold text-foreground">
                    {CURRENT_USER.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {CURRENT_USER.department}
                  </span>
                </div>
                <Avatar className="size-9 ring-2 ring-primary/20">
                  <AvatarImage src={CURRENT_USER.avatarUrl} alt={CURRENT_USER.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                    {CURRENT_USER.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Main Dashboard Content */}
          <main className="flex-1 space-y-6 p-4 md:p-8">
            {/* Welcome banner */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                  Welcome back, {CURRENT_USER.name.split(" ")[0]} 👋
                </h2>
                <p className="text-sm text-muted-foreground">
                  Here is your real-time campus attendance summary and proctored examination status.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                  {CURRENT_USER.semester}
                </Badge>
              </div>
            </div>

            {/* 4 Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SUMMARY_METRICS.map((metric) => (
                <Card key={metric.id} className="relative overflow-hidden border-border/60 shadow-xs hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </CardTitle>
                    <div className={`flex size-9 items-center justify-center rounded-xl ${metric.iconBg}`}>
                      <HugeiconsIcon icon={metric.icon} className="size-4.5" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-bold tracking-tight text-foreground">
                        {metric.value}
                      </div>
                      <Badge variant="outline" className={`text-[11px] font-medium ${metric.badgeColor}`}>
                        {metric.statusBadge}
                      </Badge>
                    </div>

                    {/* Progress track */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${Math.min(metric.progressPercent, 100)}%` }}
                      />
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {metric.subtitle}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Attendance Table Card */}
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="pb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
                      Recent Attendance Records
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground mt-0.5">
                      Verified class sessions marked via biometric recognition and campus geofencing.
                    </CardDescription>
                  </div>

                  {/* Filter and Search controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full sm:w-56">
                      <HugeiconsIcon
                        icon={Search01Icon}
                        className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
                      />
                      <Input
                        placeholder="Search subject or code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-8 pl-8 text-xs"
                      />
                    </div>

                    <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-muted/30 p-0.5">
                      {(["All", "Present", "Absent"] as const).map((status) => (
                        <Button
                          key={status}
                          variant={statusFilter === status ? "default" : "ghost"}
                          size="xs"
                          onClick={() => setStatusFilter(status)}
                          className={`text-xs h-7 px-2.5 rounded-md ${
                            statusFilter === status
                              ? "bg-primary text-primary-foreground shadow-xs"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/60 hover:bg-transparent bg-muted/30">
                      <TableHead className="w-[180px] font-semibold text-xs text-foreground uppercase tracking-wider">
                        Date & Time
                      </TableHead>
                      <TableHead className="font-semibold text-xs text-foreground uppercase tracking-wider">
                        Subject
                      </TableHead>
                      <TableHead className="w-[130px] font-semibold text-xs text-foreground uppercase tracking-wider">
                        Status
                      </TableHead>
                      <TableHead className="w-[260px] font-semibold text-xs text-foreground uppercase tracking-wider">
                        Verified By
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendance.length > 0 ? (
                      filteredAttendance.map((record) => (
                        <TableRow
                          key={record.id}
                          className="border-border/60 hover:bg-muted/40 transition-colors"
                        >
                          {/* Column 1: Date */}
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground">
                                {record.date}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <HugeiconsIcon icon={Clock01Icon} className="size-3" />
                                {record.time}
                              </span>
                            </div>
                          </TableCell>

                          {/* Column 2: Subject */}
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  {record.subject}
                                </span>
                                <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4.5 font-mono">
                                  {record.courseCode}
                                </Badge>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {record.room}
                              </span>
                            </div>
                          </TableCell>

                          {/* Column 3: Status (Present/Absent shown as Badge) */}
                          <TableCell>
                            {record.status === "Present" ? (
                              <Badge
                                variant="outline"
                                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium text-xs gap-1.5"
                              >
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                Present
                              </Badge>
                            ) : (
                              <Badge
                                variant="destructive"
                                className="font-medium text-xs gap-1.5"
                              >
                                <span className="size-1.5 rounded-full bg-destructive" />
                                Absent
                              </Badge>
                            )}
                          </TableCell>

                          {/* Column 4: Verified By (Biometric/Location) */}
                          <TableCell>
                            {record.verifiedBy === "Biometric" ? (
                              <div className="flex items-center gap-2">
                                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                  <HugeiconsIcon
                                    icon={FingerprintScanIcon}
                                    className="size-4"
                                  />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-semibold text-foreground">
                                    Biometric
                                  </span>
                                  <span className="text-[11px] text-muted-foreground truncate">
                                    {record.verificationDetail}
                                  </span>
                                </div>
                              </div>
                            ) : record.verifiedBy === "Location" ? (
                              <div className="flex items-center gap-2">
                                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                  <HugeiconsIcon
                                    icon={Location01Icon}
                                    className="size-4"
                                  />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-semibold text-foreground">
                                    Location
                                  </span>
                                  <span className="text-[11px] text-muted-foreground truncate">
                                    {record.verificationDetail}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="size-7 flex items-center justify-center rounded-lg bg-muted text-muted-foreground/60">
                                  —
                                </span>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-medium text-muted-foreground">
                                    Unverified
                                  </span>
                                  <span className="text-[11px] text-muted-foreground/80 truncate">
                                    {record.verificationDetail}
                                  </span>
                                </div>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                          No attendance records found matching &quot;{searchTerm}&quot;.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
