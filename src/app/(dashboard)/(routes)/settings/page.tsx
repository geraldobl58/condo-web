"use client";

import { useOrigin } from "@/hooks/use-origin";

import { ApiAlert } from "@/components/ui/api-alert";
import { Heading } from "@/components/ui/heading";

const SettingsPage = () => {
  const origin = useOrigin();

  return (
    <>
      <Heading
        title="Configurações"
        description="Gerenciar os endpoints do sistema."
      />
      <ApiAlert
        title="NEXT_PUBLIC_URL"
        description={`${origin}/api`}
        variant="public"
      />
    </>
  );
};

export default SettingsPage;
