module ApplicationCable
  class Connection < ActionCable::Connection::Base
identified_by :current_user
    def connect
      self.current_user = User.find(cookies.encrypted["_session_id"]["user_id"])
    end

    private

    def find_current_game
      game = Game.find_by_game_code(cookies.signed[:game_code])
    end
  end
end
