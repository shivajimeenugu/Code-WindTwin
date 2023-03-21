defmodule WindTwinWeb.PageController do
  use WindTwinWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
