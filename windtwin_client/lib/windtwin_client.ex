defmodule WindtwinClient do
  def start do
    WindtwinClient.PhoenixSocketClient.connect_server()
    WindtwinClient.WindtwinGetdata.start_link([])
  end
end
