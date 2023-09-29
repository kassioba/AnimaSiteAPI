export const paymentApiConfig = {
    headers: {
      Authorization:
        `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
    },
  };