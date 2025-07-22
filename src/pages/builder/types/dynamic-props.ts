import type { OptionType } from "./options.type";

export type DynamicProps = {
  label: string;
  name: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  preview: boolean;
  options: OptionType[];
};