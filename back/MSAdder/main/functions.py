import requests

def server_add(url):
    prome_sql = "(node_memory_MemTotal_bytes - (node_memory_MemFree_bytes + node_memory_Buffers_bytes + node_memory_Cached_bytes)) / node_memory_MemTotal_bytes * 100"
    api_url = split_url(url)

    response = requests.get(api_url,
        params={'query': prome_sql})
    return response.json()['status']

def split_url(url):
    A = url.split('/')
    return A[0] + "//" + A[2] + "/api/v1/query"

