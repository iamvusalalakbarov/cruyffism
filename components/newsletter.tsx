"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { subscribeToNewsletter } from "@/actions/newsletter-actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";

export interface ISubscriptionState {
  success?: boolean;
  message?: string;
  errors?: {
    email?: string[];
  };
}

const initialState: ISubscriptionState = {};

export function Newsletter() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <section id="newsletter" className="w-full py-12 md:py-24 bg-orange-50 dark:bg-orange-950/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Cruyffism ideologiyasının bir parçası
              ol</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Son məqalələrdən e-poçt vasitəsilə xəbərdar olun.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-4">
            {state?.message && (
              <Alert variant={state.success ? "default" : "destructive"}
                     className={state.success ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300" : ""}>
                <AlertDescription>
                  {state.message}
                </AlertDescription>
              </Alert>
            )}
            <form action={formAction} className="flex space-x-2">
              <Input
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="E-poçtunuzu daxil edin"
                type="email"
                name="email"
                aria-invalid={state?.errors?.email ? "true" : "false"}
              />
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Gözləyin
                  </>
                ) : (
                  "Abunə ol"
                )}
              </Button>
            </form>
            {state?.errors?.email && (
              <p className="text-sm text-red-500">{state.errors.email[0]}</p>
            )}
            <p className="text-xs text-muted-foreground">Məxfiliyinizi qoruyuruq. İstədiyiniz zaman abunəliyi ləğv edə
              bilərsiniz.</p>
          </div>
        </div>
      </div>
    </section>
  );
}