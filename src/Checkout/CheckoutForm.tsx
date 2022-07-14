import { FormField } from "./FormField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface CheckoutFormProps {
  submit?: () => Promise<void>;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  cardNumber: yup
    .string()
    .required()
    .matches(
      /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
      "Card should have xxxx xxxx xxxx xxxx format"
    ),
  expDate: yup.date().nullable().default(null).required(),
  cvv: yup
    .string()
    .required()
    .matches(/^\d\d\d$/, "CVV should contain three numbers"),
});

export const CheckoutForm = ({
  submit = async () => {},
}: CheckoutFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });
  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormField
        placeholder="John Smith"
        type="text"
        label="Cardholders Name"
        {...register("name")}
        errors={errors.name as any}
      />
      <FormField
        placeholder="0000 0000 0000 0000"
        type="tel"
        inputMode="numeric"
        autoComplete="cc-number"
        label="Card Number"
        normalize={(value) => {
          return (
            value
              .replace(/\s/g, "")
              .match(/.{1,4}/g)
              ?.join(" ")
              .substr(0, 19) || ""
          );
        }}
        {...register("cardNumber")}
        errors={errors.cardNumber as any}
      />
      <FormField
        type="month"
        label="Expiration Date"
        {...register("expDate")}
        errors={errors.expDate as any}
      />
      <FormField
        placeholder="000"
        type="number"
        label="CVV"
        normalize={(value) => {
          return value.substr(0, 3);
        }}
        {...register("cvv")}
        errors={errors.cvv as any}
      />
      <button className="nes-btn is-primary">Place order</button>
    </form>
  );
};
