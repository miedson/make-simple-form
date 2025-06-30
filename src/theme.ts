import { createSystem, defaultConfig, defineConfig, defineRecipe } from '@chakra-ui/react';

const buttonRecipe = defineRecipe({
  base: {
    borderRadius: 'md',
    fontWeight: 'medium',
    padding: '8px 16px',
  },
  variants: {
    variant: {
      solid: {
        background: '{colors.brand.500}',
        color: 'white',
        _hover: {
          background: '{colors.brand.600}',
        },
      },
      outline: {
        border: '1px solid',
        borderColor: '{colors.brand.500}',
        color: '{colors.brand.500}',
        _hover: {
          bg: '{colors.brand.50}',
        },
      },
    },
    colorScheme: {
      brand: {},
      red: {},
    },
  },
  defaultVariants: {
    variant: 'solid',
    colorScheme: 'brand',
  },
});

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#eff6ff' },
          100: { value: '#dbeafe' },
          200: { value: '#bfdbfe' },
          300: { value: '#93c5fd' },
          400: { value: '#60a5fa' },
          500: { value: '#3b82f6' },
          600: { value: '#2563eb' },
          700: { value: '#1d4ed8' },
          800: { value: '#1e40af' },
          900: { value: '#1e3a8a' },
        },
        red: {
          50: { value: '#fef2f2' },
          100: { value: '#fee2e2' },
          200: { value: '#fecaca' },
          300: { value: '#fca5a5' },
          400: { value: '#f87171' },
          500: { value: '#ef4444' },
          600: { value: '#dc2626' },
          700: { value: '#b91c1c' },
          800: { value: '#991b1b' },
          900: { value: '#7f1d1d' },
        },
      },
      fonts: {
        heading: { value: 'Inter, system-ui, sans-serif' },
        body: { value: 'Inter, system-ui, sans-serif' },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
