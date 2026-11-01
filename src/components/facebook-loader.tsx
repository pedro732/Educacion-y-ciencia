'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

const InfoFacebook = dynamic(() => import('@/components/InfoFacebook'), {
  ssr: false,
  loading: () => (
    <div className="grid md:grid-cols-3 gap-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    </div>
  ),
});

export default function FacebookLoader() {
  return <InfoFacebook />;
}
