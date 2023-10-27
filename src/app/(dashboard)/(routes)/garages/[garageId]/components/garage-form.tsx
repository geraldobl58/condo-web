"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import axios from "axios";

import * as z from "zod";

import { Trash } from "lucide-react";

import { Garage } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface GarageFormProps {
  initialData: Garage | null;
}

export const formShema = z.object({
  quantity: z.coerce.number().min(1, {
    message: "Campo obrigário",
  }),
});

type GarageFormValues = z.infer<typeof formShema>;

export const GarageForm = ({ initialData }: GarageFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar registro" : "Novo registro";
  const description = initialData
    ? "Edite uma registro existente."
    : "Adicione uma novo registro.";
  const toastMessage = initialData
    ? "Registro atualizado com sucesso!"
    : "Registro cadastrado com sucesso!";
  const action = initialData ? "Editar registro" : "Salvar registro";

  const form = useForm<GarageFormValues>({
    resolver: zodResolver(formShema),
    defaultValues: initialData || {
      quantity: 0,
    },
  });

  const onSubmit = async (data: GarageFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/garages/${params.garageId}`, data);
      } else {
        await axios.post(`/api/garages`, data);
      }
      router.refresh();
      toast.success(toastMessage);
      router.push("/garages");
    } catch (error) {
      toast.error(toastMessage);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/garages/${params.bedroomId}`);
      router.refresh();
      router.push("/");
      toast.success("Registro excluido com sucesso!");
    } catch (error) {
      toast.error("Houve um erro ao cadastrar.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full mt-5"
        >
          <div className="grid grid-cols-4 gap-8">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
