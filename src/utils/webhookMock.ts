export const webhookMock = {
    accounts_info: null,
    acquirer_reconciliation: [],
    additional_info: {
      authentication_code: null,
      available_balance: null,
      ip_address: "177.98.208.204",
      items: [
        {
          category_id: null,
          description: null,
          id: null,
          picture_url: null,
          quantity: "2",
          title: "titulo",
          unit_price: "75"
        }
      ],
      nsu_processadora: null,
      payer: {
        first_name: "nome do mano"
      }
    },
    authorization_code: "229549003",
    binary_mode: false,
    brand_id: null,
    build_version: "3.18.0",
    call_for_authorize_id: null,
    captured: true,
    card: {
      cardholder: {
        identification: {
          number: "12345678909",
          type: "CPF"
        },
        name: "OTHE"
      },
      date_created: "2023-09-29T12:25:34.000-04:00",
      date_last_updated: "2023-09-29T12:25:34.000-04:00",
      expiration_month: 11,
      expiration_year: 2025,
      first_six_digits: "375365",
      id: null,
      last_four_digits: "6885"
    },
    charges_details: [],
    collector_id: 156684876,
    corporation_id: null,
    counter_currency: null,
    coupon_amount: 0,
    currency_id: "BRL",
    date_approved: null,
    date_created: "2023-09-29T12:25:34.244-04:00",
    date_last_updated: "2023-09-29T12:25:34.575-04:00",
    date_of_expiration: null,
    deduction_schema: null,
    description: "titulo",
    differential_pricing_id: null,
    external_reference: null,
    fee_details: [],
    financing_group: null,
    id: 1318252651,
    installments: 1,
    integrator_id: null,
    issuer_id: "18",
    live_mode: false,
    marketplace_owner: null,
    merchant_account_id: null,
    merchant_number: null,
    metadata: {},
    money_release_date: null,
    money_release_schema: null,
    money_release_status: null,
    notification_url: "https://webhook.site/743c0d38-9982-4bc6-8c67-d924460bf1f1",
    operation_type: "regular_payment",
    order: {
      id: "12137860396",
      type: "mercadopago"
    },
    payer: {
      first_name: null,
      last_name: null,
      email: "test_user_80507629@testuser.com",
      identification: {
        number: "32659430",
        type: "DNI"
      },
      phone: {
        area_code: null,
        number: null,
        extension: null
      },
      type: null,
      entity_type: null,
      id: "1493586661"
    },
    payment_method: {
      data: {
        routing_data: {
          merchant_account_id: "60272716"
        }
      },
      id: "amex",
      issuer_id: "18",
      type: "credit_card"
    },
    payment_method_id: "amex",
    payment_type_id: "credit_card",
    platform_id: null,
    point_of_interaction: {
      business_info: {
        sub_unit: "checkout_pro",
        unit: "online_payments"
      },
      transaction_data: {
        e2e_id: null
      },
      type: "CHECKOUT"
    },
    pos_id: null,
    processing_mode: "aggregator",
    refunds: [],
    shipping_amount: 0,
    sponsor_id: null,
    statement_descriptor: null,
    status: "rejected",
    status_detail: "cc_rejected_other_reason",
    store_id: null,
    tags: null,
    taxes_amount: 0,
    transaction_amount: 150,
    transaction_amount_refunded: 0,
    transaction_details: {
      acquirer_reference: null,
      external_resource_url: null,
      financial_institution: null,
      installment_amount: 150,
      net_received_amount: 0,
      overpaid_amount: 0,
      payable_deferral_period: null,
      payment_method_reference_id: null,
      total_paid_amount: 150
    }
  }