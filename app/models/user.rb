class User < ApplicationRecord
  include Api::SessionsHelper 
  validates :email, presence: true, uniqueness: true 
  validates :first_name, :last_name, :account_balance, :password_digest, :session_token, presence: true 
  validates :password, length: {minimum: 6, allow_nil: true }

  has_many :watch_list_items 
  has_many :holdings

  attr_reader :password
  attr_accessor :net_worth, :total_cost_basis, :buy_stock, :sell_stock, :buy_more_stock

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password) 
    user = User.find_by(email: email)
    return nil unless user 
    user.is_password?(password) ? user : nil 
  end

  def password=(password) 
    @password = password 
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token! 
    self.session_token = SecureRandom.urlsafe_base64
    self.save 
    self.session_token 
  end

  def sell_stock(ticker)
    client = Client.new(ticker)
    holding = Holding.find_by(ticker: ticker, user_id: self.id)
    self.account_balance = self.account_balance + ((client.get_price(ticker)) * holding.num_shares)
    self.save 
    return self.account_balance
  end

  def buy_stock(ticker)
    client = Client.new(ticker)
    holding = Holding.find_by(ticker: ticker, user_id: self.id)
    self.account_balance = self.account_balance - ((client.get_price(ticker)) * holding.num_shares)
    self.save 
    return self.account_balance 
  end

  def buy_more_stock(ticker)
    client = Client.new(ticker)
    holding = Holding.find_by(ticker: ticker, user_id: self.id)
    self.account_balance = self.account_balance - ((client.get_price(ticker)) * holding.num_shares)
    self.save 
    return self.account_balance 
  end

  def total_cost_basis
    total = 0 
    self.holdings.each do |holding| 
      total += (holding.cost_basis * holding.num_shares)
    end
    total 
  end

  def net_worth
    client = Client.new
    symbol_string = [];
    total = self.account_balance

    holdings2 = self.holdings;
 
    holdings2.each do |holding| 
      symbol_string << holding.ticker.downcase
    end

    symbol_string = symbol_string.join(',');
    stock_prices = client.fetchPrices(symbol_string);

    holdings2.each do |holding|
      share_price = stock_prices[holding.ticker]["price"]
      total += (share_price * holding.num_shares)
    end
    
    total 
  end

  private 
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
