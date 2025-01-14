import React from "react";
import { useFormik, FormikHelpers } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { daoWithInvite } from "@/validation/dao.validation";
import Form from "next/form";
import { useDao } from "@/hooks/use-dao";

type FormValues = z.infer<typeof daoWithInvite>;

interface Props {
  inviteCode?: string;
}

const DaoInitForm: React.FC<Props> = ({ inviteCode = "" }) => {
  const { createDao } = useDao();
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const resp = await createDao(values);
      console.log(resp);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
      fundTicker: "",
      twitterHandle: "",
      telegramHandle: "",
      telegramGroup: "",
      poc: "",
      inviteCode,
    },
    validationSchema: toFormikValidationSchema(daoWithInvite),
    onSubmit: handleSubmit,
  });

  const renderField = (
    name: keyof FormValues,
    label: string,
    placeholder: string = "",
    type: string = "text",
    required: boolean = true
  ) => (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className={
          formik.errors[name] && formik.touched[name] ? "border-red-500" : ""
        }
        disabled={formik.isSubmitting}
      />
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-red-500 text-sm">{String(formik.errors[name])}</p>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Your Hedge Fund DAO
      </h2>

      <Form action="" onSubmit={formik.handleSubmit} className="space-y-4">
        {renderField("title", "Fund Name", "Enter your fund's name")}
        {renderField("fundTicker", "Fund Ticker", "e.g., BTC, ETH")}
        {renderField(
          "description",
          "Fund Description",
          "Describe your fund's strategy and goals"
        )}
        {renderField("twitterHandle", "Twitter/X Handle", "@username")}
        {renderField("telegramHandle", "Telegram Handle", "@username")}
        {renderField(
          "telegramGroup",
          "Telegram Group",
          "@groupname (optional)",
          "text",
          false
        )}
        {renderField(
          "poc",
          "Point of Contact at DeFi",
          "Enter the name of your DeFi contact"
        )}
        {renderField(
          "inviteCode",
          "Invite Code",
          "Enter the invite code you received"
        )}

        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default DaoInitForm;
