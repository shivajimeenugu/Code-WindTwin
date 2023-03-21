defmodule WindtwinClientTest do
  use ExUnit.Case
  doctest WindtwinClient

  test "greets the world" do
    assert WindtwinClient.hello() == :world
  end
end
