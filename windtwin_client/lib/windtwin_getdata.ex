defmodule WindtwinClient.WindtwinGetdata do
  use GenServer

  def start_link(opts) do
    IO.puts("Starting Connction With Hardware..")
    GenServer.start_link(__MODULE__, [], opts)
  end

  def init(_) do
    {:ok, pid} = Circuits.UART.start_link()
    Circuits.UART.configure(pid, framing: {Circuits.UART.Framing.Line, separator: "\r\n"})
    Circuits.UART.open(pid, "COM5", speed: 9600, active: false)
    IO.puts("Getting Data..")
    loop(pid)
    {:ok, []}
  end

  def loop(pid) do
    IO.puts("-")

    case Circuits.UART.read(pid, 10000) do
      {:ok, data} ->
        WindtwinClient.PhoenixSocketClient.send_status(data)

      {:error, _} ->
        :ok
    end

    loop(pid)
  end
end
