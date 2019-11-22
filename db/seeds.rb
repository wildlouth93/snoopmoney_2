# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Holding.destroy_all
WatchListItem.destroy_all
User.destroy_all

user1 = User.create( email: 'u28@gmail.com', first_name: 'Demo', last_name: 'User', account_balance: 45000, password: 'hunter2');
user2 = User.create( email: 'smuser2@gmail.com', first_name: 'Sm2', last_name: 'User2', account_balance: 2500, password: 'hunter2');
user3 = User.create( email: 'smuser3@gmail.com', first_name: 'Sm3', last_name: 'User3', account_balance: 2500, password: 'hunter2');
user4 = User.create( email: 'smuser4@gmail.com', first_name: 'Sm4', last_name: 'User4', account_balance: 2500, password: 'hunter2');
user5 = User.create( email: 'smuser5@gmail.com', first_name: 'Sm5', last_name: 'User5', account_balance: 2500, password: 'hunter2');

holding1 = Holding.create( user_id: user1.id, ticker: 'MSFT', num_shares: 10, cost_basis: 50);
holding2 = Holding.create( user_id: user1.id, ticker: 'AMZN', num_shares: 10, cost_basis: 50);
holding3 = Holding.create( user_id: user1.id, ticker: 'AAPL', num_shares: 10, cost_basis: 50);
holding4 = Holding.create( user_id: user1.id, ticker: 'GE', num_shares: 10, cost_basis: 50);
holding5 = Holding.create( user_id: user1.id, ticker: 'FB', num_shares: 10, cost_basis: 50);

watch_list_item1 = WatchListItem.create( user_id: user1.id, ticker: 'FB');
watch_list_item2 = WatchListItem.create( user_id: user1.id, ticker: 'AMZN');
watch_list_item3 = WatchListItem.create( user_id: user1.id, ticker: 'UA');
watch_list_item4 = WatchListItem.create( user_id: user1.id, ticker: 'GOOGL');
watch_list_item5 = WatchListItem.create( user_id: user1.id, ticker: 'AAPL');
