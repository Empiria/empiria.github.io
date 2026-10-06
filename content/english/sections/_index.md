---
# The home page pulls these in with site.GetPage; they are not pages in their
# own right, so nothing here is rendered or listed (and none of it lands in
# the sitemap).
build:
  render: never
  list: never
cascade:
  build:
    render: never
    list: local
---
