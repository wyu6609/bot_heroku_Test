# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts 'cleaning old data..'
User.destroy_all
Product.destroy_all
Review.destroy_all

puts 'seeding categories'

Category.create(name: 'Pre-Programmed')
Category.create(name: 'Humanoid')
Category.create(name: 'Autonomous')
Category.create(name: 'Teleoperated')
Category.create(name: 'Augmenting')

puts 'seeding User...'

User.create(
  first_name: 'john',
  last_name: 'smith',
  username: 'admin',
  password_digest: BCrypt::Password.create('admin'),
)

100.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    username: Faker::Internet.unique.user_name,
    password_digest: BCrypt::Password.create(Faker::Bank.account_number),
  )
end
puts 'seeding Product...'
250.times do
  seed = Faker::Number.between(from: 1, to: 10_000)

  Product.create(
    title: Faker::Name.unique.name,
    description: Faker::Lorem.paragraph,
    category_id: Category.ids.sample,
    price: Faker::Commerce.price(range: 0.0..10.0),
    image: "https://avatars.dicebear.com/api/bottts/#{seed}.svg",
  )
end

puts 'seeding Review...'

1000.times do
  Review.create(
    description: Faker::Quote.famous_last_words,
    rating: Faker::Number.between(from: 1, to: 5),
    user_id: User.ids.sample,
    product_id: Product.ids.sample,
  )
end
