defmodule WindtwinClient.PhoenixSocketClient do
  use GenServer
    alias PhoenixClient.{Socket, Channel, Message}

    @doc """

    """
    def connect_server do
      socket_opts = [
        url: "ws://localhost:4000/socket/websocket"
      ]
      {:ok, socket} = PhoenixClient.Socket.start_link(socket_opts)
      wait_until_connected(socket)
       {:ok, _response, channel}=PhoenixClient.Channel.join(socket,"twin:lobby")
      IO.puts("Connected..")
       if !Enum.member?(Process.registered(),:con) do
        Process.register(channel,:con)
      else
        Process.unregister(:con)
        Process.register(channel,:con)
      end
      IO.puts("Registered..")

      {:ok, _response, channel}
    end

    @doc """

    """
    defp wait_until_connected(socket) do
      if !PhoenixClient.Socket.connected?(socket) do
        Process.sleep(100)
        wait_until_connected(socket)
      end
    end

    def send_status(data) do
      PhoenixClient.Channel.push_async(:con, "updatereal", %{data: data})
      IO.puts("Data: #{data}")
    end

end
