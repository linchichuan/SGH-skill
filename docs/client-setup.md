# Client Setup

Production URL placeholder: `https://mcp.shingihou.com/mcp`

The endpoint is not considered live until deployment, OAuth discovery and an authenticated smoke test have been verified.

## Codex CLI / IDE / ChatGPT desktop host

```toml
[mcp_servers.sgh]
url = "https://mcp.shingihou.com/mcp"
auth = "oauth"
scopes = ["profile", "requests:read", "requests:write", "passes:redeem"]
default_tools_approval_mode = "writes"
```

```bash
codex mcp login sgh
```

Keep confirmation、cancel、handoff and Pass redemption in prompt approval mode.

Installing or connecting the Skill grants no SGH service credit. Clients must treat missing `commercial.execution_eligible=true` or `ENTITLEMENT_REQUIRED` as a hard stop and must not retry confirmation as a way to bypass payment.

## Claude Code

```bash
claude mcp add --transport http sgh https://mcp.shingihou.com/mcp
claude mcp login sgh
```

Project `.mcp.json`:

```json
{
  "mcpServers": {
    "sgh": {
      "type": "http",
      "url": "https://mcp.shingihou.com/mcp"
    }
  }
}
```

Do not auto-approve `mcp__sgh__confirm_assistance_request`、cancel、handoff or Pass redemption with a wildcard.

## ChatGPT developer mode

1. Deploy a public HTTPS `/mcp` endpoint.
2. Verify `/.well-known/oauth-protected-resource` and authorization-server discovery.
3. Add the exact callback URL shown by ChatGPT to the authorization server allowlist.
4. Add the MCP URL in ChatGPT developer mode and complete OAuth linking.
5. Test draft、confirm retry、status、result and cancellation race before submission.

Public submission is separate from GitHub publication. The app must provide real utility, must not primarily be an advertisement, and the public v1 must not collect PHI.

## Official references

- [OpenAI Apps authentication](https://developers.openai.com/apps-sdk/build/auth)
- [OpenAI MCP server guide](https://developers.openai.com/apps-sdk/build/mcp-server)
- [Codex MCP configuration](https://learn.chatgpt.com/docs/extend/mcp)
- [Claude Code MCP](https://code.claude.com/docs/en/mcp)
- [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
