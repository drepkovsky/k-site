export const animations = {
  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  fadeOut: `
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `,
  down: `
    @keyframes down {
      from {
        transform: translateY(-100px);
      }
      to {
        transform: translateY(0);
      }
    }
  `,
  up: `
    @keyframes up {
      from {
        transform: translateY(+100px);
      }
      to {
        transform: translateY(0);
      }
    }
  `,
  spin: `
    @keyframes spin{
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
};
