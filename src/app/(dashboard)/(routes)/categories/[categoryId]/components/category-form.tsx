"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import axios from "axios";

import * as z from "zod";

import { Trash } from "lucide-react";

import { Category } from "@prisma/client";

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

interface CategoriesFormProps {
  initialData: Category | null;
}

export const formShema = z.object({
  name: z.string().min(3, {
    message: "Campo obrigário",
  }),
});

type CategoriesFormValues = z.infer<typeof formShema>;

export const CategoriesForm = ({ initialData }: CategoriesFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar categoria" : "Nova categoria";
  const description = initialData
    ? "Edite uma categoria existente."
    : "Adicione uma nova categoria.";
  const toastMessage = initialData
    ? "Categoria atualizada com sucesso!"
    : "Categoria cadastrada com sucesso!";
  const action = initialData ? "Editar registro" : "Salvar registro";

  const form = useForm<CategoriesFormValues>({
    resolver: zodResolver(formShema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: CategoriesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/categories/${params.categoryId}`, data);
      } else {
        await axios.post(`/api/categories`, data);
      }
      router.refresh();
      toast.success(toastMessage);
      router.push("/categories");
    } catch (error) {
      toast.error(toastMessage);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/categories/${params.categoryId}`);
      router.refresh();
      router.push("/");
      toast.success("Categoria excluida com sucesso!");
    } catch (error) {
      toast.error("Houve um erro ao cadastrar a categoria.");
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
          <div className="grid gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o nome da categoria."
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
