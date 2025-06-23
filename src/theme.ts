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
