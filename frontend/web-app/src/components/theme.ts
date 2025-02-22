import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.900',
      },
    },
  },
  colors: {
    brand: {
      500: '#D20A0A', // UFC red
      600: '#AF0808',
      700: '#8C0606',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px #D20A0A',
            },
          },
        },
      },
    },
  },
});

export default theme;
