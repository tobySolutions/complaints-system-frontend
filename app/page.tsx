import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full px-4">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">University CMS</CardTitle>
            <CardDescription>Login to access the complaints management system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="lecturer">Lecturer</TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Student Email</Label>
                    <Input id="student-email" placeholder="student@university.edu" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input id="student-password" type="password" />
                  </div>
                  <Link href="/student/dashboard">
                    <Button className="w-full">Login as Student</Button>
                  </Link>
                </form>
              </TabsContent>
              <TabsContent value="lecturer">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lecturer-email">Lecturer Email</Label>
                    <Input id="lecturer-email" placeholder="lecturer@university.edu" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lecturer-password">Password</Label>
                    <Input id="lecturer-password" type="password" />
                  </div>
                  <Link href="/lecturer/dashboard">
                    <Button className="w-full">Login as Lecturer</Button>
                  </Link>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

