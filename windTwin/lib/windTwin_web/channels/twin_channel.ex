defmodule WindTwinWeb.TwinChannel do
  use WindTwinWeb, :channel


  def join("twin:lobby", _payload, socket) do
    WindTwinWeb.Endpoint.subscribe("twin:update")
    :ok = Phoenix.PubSub.subscribe(WindTwin.PubSub, "twin:update")

    {:ok, socket}
  end



  def handle_in("update",data, socket) do
    IO.puts(" #{inspect data["data"]} #{inspect data["labels"]}")
    broadcast_from(socket, "update", data)
    {:noreply, socket}
  end


  def handle_in("updatereal",data, socket) do
    IO.puts(" #{inspect data}")
    broadcast!(socket, "updatereal", data)
    WindTwinWeb.Endpoint.broadcast_from(self(), "twin:update", "updatereal", data)

    {:noreply, socket}
  end

  

  def handle_out(e,p,socket) do
    push(socket, e, p)
    IO.puts("[RoomChannel]  handle out")
    IO.inspect(e)
    IO.inspect(p)
    {:noreply, socket}
  end


  def handle_info(data, socket) do
    IO.puts("[RoomChannel] info")
    IO.inspect(data)
    socket= cond do
        data.event == "light" ->
          IO.puts("[RoomChannel] handle_info[m]")
          Phoenix.Channel.push(socket, "light", data.payload)
          socket

        true ->
          socket
      end

    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
