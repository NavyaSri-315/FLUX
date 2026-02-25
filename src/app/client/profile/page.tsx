import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { mockClientUser } from "@/lib/data";
import { CheckCircle, Edit, Bell, CreditCard, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <div className="grid grid-cols-3 gap-4 items-center">
        <Label className="text-muted-foreground">{label}</Label>
        <div className="col-span-2">
            <p>{value}</p>
        </div>
    </div>
)


export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your account information and preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
            <Card className="bg-card/60 backdrop-blur-xl border-border/30">
                <CardContent className="p-6 text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src={mockClientUser.avatarUrl} alt={mockClientUser.name} />
                        <AvatarFallback>{mockClientUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{mockClientUser.name}</h2>
                    <p className="text-muted-foreground">{mockClientUser.company}</p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                        <ShieldCheck className="h-5 w-5"/>
                        <span className="font-medium">KYC Verified</span>
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-card/60 backdrop-blur-xl border-border/30">
                <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-md border border-border/50 p-3">
                        <div className="flex items-center gap-3">
                            <CreditCard className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Bank Account</p>
                                <p className="text-sm text-muted-foreground">**** **** **** 1234</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                    <Button variant="outline" className="w-full">Add New Method</Button>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <Card className="bg-card/60 backdrop-blur-xl border-border/30">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>Update your personal information here.</CardDescription>
                    </div>
                    <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <DetailRow label="Full Name" value={mockClientUser.name} />
                    <Separator />
                    <DetailRow label="Email Address" value={mockClientUser.email} />
                    <Separator />
                    <DetailRow label="Company" value={mockClientUser.company} />
                     <Separator />
                    <DetailRow label="Phone" value="+1 (123) 456-7890" />
                     <Separator />
                    <DetailRow label="Address" value="123 Innovation Drive, Tech City, USA" />
                </CardContent>
            </Card>

            <Card className="mt-8 bg-card/60 backdrop-blur-xl border-border/30">
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Choose how you want to be notified.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-md border border-border/50 p-3">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">For transaction updates and security alerts.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between rounded-md border border-border/50 p-3">
                        <div>
                            <p className="font-medium">Marketing Emails</p>
                            <p className="text-sm text-muted-foreground">Receive updates on new features and offers.</p>
                        </div>
                        <Switch />
                    </div>
                 </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
