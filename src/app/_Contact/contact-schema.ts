import { z } from "zod";

const selectionSchema = z.object({
  categoryIds: z.array(z.string()),
  services: z.array(z.string()),
  customCategory: z.object({
    subject: z.string().trim(),
    description: z.string().trim(),
  }),
  customServiceSelected: z.boolean(),
  customService: z.string().trim(),
});

export const contactFormSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email("Enter a valid email").trim().min(1, "Email is required"),
    company: z.string().trim().optional(),
    selection: selectionSchema,
  })
  .superRefine((data, ctx) => {
    const { selection } = data;

    if (selection.categoryIds.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["selection", "categoryIds"],
        message: "Select at least one category",
      });
    }

    if (selection.services.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["selection", "services"],
        message: "Select at least one service",
      });
    }

    if (selection.categoryIds.includes("custom")) {
      if (!selection.customCategory.subject) {
        ctx.addIssue({
          code: "custom",
          path: ["selection", "customCategory", "subject"],
          message: "Subject is required",
        });
      }

      if (!selection.customCategory.description) {
        ctx.addIssue({
          code: "custom",
          path: ["selection", "customCategory", "description"],
          message: "Description is required",
        });
      }
    }

    if (selection.customServiceSelected && !selection.customService) {
      ctx.addIssue({
        code: "custom",
        path: ["selection", "customService"],
        message: "Custom service is required",
      });
    }
  });

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ServiceSelectorValue = z.infer<typeof selectionSchema>;

export const createEmptySelection = (): ServiceSelectorValue => ({
  categoryIds: [],
  services: [],
  customCategory: {
    subject: "",
    description: "",
  },
  customServiceSelected: false,
  customService: "",
});
