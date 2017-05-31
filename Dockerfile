FROM ruby:2.4

RUN apt-get update && apt-get install -y \
  build-essential \
  nodejs


RUN mkdir -p /app
WORKDIR /app

RUN apt-get install -y libqt4-dev libqtwebkit-dev

RUN gem install bundler && \
    bundle config --global path "$GEM_HOME" && \
    bundle config --global bin "$GEM_HOME/bin" && \
    bundle config --global jobs 10
ENV BUNDLE_APP_CONFIG $GEM_HOME
RUN echo "export BUNDLE_APP_CONFIG=$GEM_HOME" >> /root/.bashrc

COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 20 --retry 5

# Installing node
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    apt-get install -y nodejs

RUN mkdir tmp
COPY Rakefile .
COPY ./config/ ./config
COPY ./bin ./bin
COPY npm_packages .
RUN ./bin/rake npm:install

COPY . .
RUN ./bin/rake assets:precompile


EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]