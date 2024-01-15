# prefix-suffix
Add prefix/suffix to text/json

## Usage

For live examples, please see [actions](https://github.com/yakubique/prefix-suffix/actions/workflows/test-myself.yaml)

```yaml
uses: yakubique/prefix-suffix@v1
with:
  input: "My awesome text"
  prefix: "##"
  suffix: '🥳'

# result: "##My awesome text🥳"
```

## With flat-json

```yaml
uses: yakubique/prefix-suffix@v1
with:
  input: '["1.0.0","1.1.0","1.2.0","1.2.1","1.3.0"]'
  prefix: 'v'
  type: 'flat-json'

# result: "["v1.0.0","v1.1.0","v1.2.0","v1.2.1","v1.3.0"]"
```

## With nested json

```yaml
uses: yakubique/prefix-suffix@v1
with:
  input: '[{"name":"v0.3.26","tag_name":"v0.3.26","prerelease":false,"published_at":"2023-08-07T09:43:28Z"},{"name":"v0.3.22","tag_name":"v0.3.22","prerelease":false,"published_at":"2023-11-12T10:58:00Z"},{"name":"v0.3.23","tag_name":"v0.3.23","prerelease":false,"published_at":"2023-11-12T10:59:27Z"},{"name":"v0.3.25","tag_name":"v0.3.25","prerelease":false,"published_at":"2023-11-12T11:01:20Z"},{"name":"v0.3.31","tag_name":"v0.3.31","prerelease":false,"published_at":"2023-11-12T11:17:17Z"},{"name":"v0.3.34","tag_name":"v0.3.34","prerelease":false,"published_at":"2023-11-12T11:21:59Z"}]'
  type: "nested-json"
  key: "name"
  prefix: 'The name is: '
  suffix: "."

# result: "[{"name":"The name is:v0.3.26.","tag_name":"v0.3.26","prerelease":false,"published_at":"2023-08-07T09:43:28Z"},{"name":"The name is:v0.3.22.","tag_name":"v0.3.22","prerelease":false,"published_at":"2023-11-12T10:58:00Z"},{"name":"The name is:v0.3.23.","tag_name":"v0.3.23","prerelease":false,"published_at":"2023-11-12T10:59:27Z"},{"name":"The name is:v0.3.25.","tag_name":"v0.3.25","prerelease":false,"published_at":"2023-11-12T11:01:20Z"},{"name":"The name is:v0.3.31.","tag_name":"v0.3.31","prerelease":false,"published_at":"2023-11-12T11:17:17Z"},{"name":"The name is:v0.3.34.","tag_name":"v0.3.34","prerelease":false,"published_at":"2023-11-12T11:21:59Z"}]"
```

## Use output

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4
  - name: Prefix/suffix
    id: modify_text
    uses: yakubique/prefix-suffix@v1
    with:
      input: "My awesome text"
      prefix: "## "
      suffix: ' 🥳'
  - name: Echo output
    run: |
      echo "${{ steps.modify_text.outputs.result }}"
```
