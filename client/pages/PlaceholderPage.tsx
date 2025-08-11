import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
      <Header />
      
      <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <Card className="text-center">
          <CardContent className="pt-12 pb-12">
            <Construction className="mx-auto h-16 w-16 text-brand-purple-600 mb-6" />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                This page is under construction. We're working hard to bring you amazing features!
              </p>
              <Button 
                variant="outline" 
                className="border-brand-purple-300 text-brand-purple-700 hover:bg-brand-purple-100"
              >
                Continue exploring EduSage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
