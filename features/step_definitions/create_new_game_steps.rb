Given /^I am not yet playing$/ do
end

When /^I start a new game$/ do
  visit "/"
  click_button "Create new game"
end

Then /^I should see "([^"]*)"$/ do |message|
  page.should have_content(message)
end


