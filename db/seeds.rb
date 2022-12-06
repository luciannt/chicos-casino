user1 = User.create(username: "luciannt", password: "password")
user2 = User.create(username: "meepmorp", password: "password")

game = Game.create(game_code: "545rjfdlkjfdkfsd", turn_count: 10)

gamePlayer = GamePlayer.create!(game: game, user: user1, order: 1)

puts "seeded 💧"

# rails db:drop && rails db:create && rails db:migrate && rails db:seed
