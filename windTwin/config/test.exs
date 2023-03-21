import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :windTwin, WindTwinWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "4KRZB01Z4FBE79b+EVfth3fZrC243njaW86l62cx58qOtrrh0OAiwzD8XNhuRG7v",
  server: false

# In test we don't send emails.
config :windTwin, WindTwin.Mailer,
  adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
